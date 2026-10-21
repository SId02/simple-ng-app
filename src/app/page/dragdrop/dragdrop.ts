
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ColumnId = 'todo' | 'doing' | 'done';

interface CardBoard {
  id: string;
  title: string;
  description: string;
  column: ColumnId;
}
@Component({
  selector: 'app-dragdrop',
  imports: [FormsModule],
  styleUrl: './dragdrop.css',
  templateUrl: './dragdrop.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dragdrop {
  readonly columns: { id: ColumnId; title: string }[] = [
    { id: 'todo', title: 'To do' },
    { id: 'doing', title: 'In progress' },
    { id: 'done', title: 'Done' },
  ];

  private readonly storageKey = 'angular-board-cards';

  readonly cards = signal<CardBoard[]>(this.loadCards());
  readonly modalOpen = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly title = signal('');
  readonly description = signal('');
  readonly selectedColumn = signal<ColumnId>('todo');
  readonly draggedId = signal<string | null>(null);

  cardsFor(column: ColumnId): CardBoard[] {
    return this.cards().filter((card) => card.column === column);
  }

  openAddModal(): void {
    this.editingId.set(null);
    this.title.set('');
    this.description.set('');
    this.selectedColumn.set('todo');
    this.modalOpen.set(true);
  }

  openEditModal(card: CardBoard): void {
    this.editingId.set(card.id);
    this.title.set(card.title);
    this.description.set(card.description);
    this.selectedColumn.set(card.column);
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }

  saveCard(): void {
    const title = this.title().trim();
    const description = this.description().trim();

    if (!/^[A-Za-z ]+$/.test(title) || description.length < 10) return;

    const current = this.cards();
    const editingId = this.editingId();
    const column = this.selectedColumn();

    if (editingId) {
      const card = current.find((item) => item.id === editingId);
      if (!card) return;

      const withoutCard = current.filter((item) => item.id !== editingId);
      const updated: CardBoard = { ...card, title, description, column };

      const next =
        card.column === column
          ? current.map((item) => (item.id === editingId ? updated : item))
          : [...withoutCard, updated];

      this.setCards(next);
    } else {
      this.setCards([...current, { id: crypto.randomUUID(), title, description, column }]);
    }

    this.closeModal();
  }

  deleteCard(): void {
    const id = this.editingId();
    if (!id) return;

    this.setCards(this.cards().filter((card) => card.id !== id));
    this.closeModal();
  }

  onDragStart(event: DragEvent, cardId: string): void {
    this.draggedId.set(cardId);
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', cardId);
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragEnd(): void {
    this.draggedId.set(null);
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  }

  onDrop(event: DragEvent, targetColumn: ColumnId): void {
    event.preventDefault();

    const cardId = event.dataTransfer?.getData('text/plain') || this.draggedId();
    this.draggedId.set(null);

    if (!cardId) return;

    const card = this.cards().find((item) => item.id === cardId);
    if (!card || card.column === targetColumn) return;

    const moved = { ...card, column: targetColumn };
    this.setCards([...this.cards().filter((item) => item.id !== cardId), moved]);
  }

  private setCards(cards: CardBoard[]): void {
    this.cards.set(cards);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(cards));
    } catch {}
  }

  private loadCards(): CardBoard[] {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed as CardBoard[];
      }
    } catch {}

    return [
      {
        id: crypto.randomUUID(),
        title: 'Plan project',
        description: 'Write down the main goals and outline the first steps.',
        column: 'todo',
      },
      {
        id: crypto.randomUUID(),
        title: 'Build interface',
        description: 'Create the initial layout and make the board easy to use.',
        column: 'doing',
      },
      {
        id: crypto.randomUUID(),
        title: 'Review work',
        description: 'Check the finished changes and confirm everything looks good.',
        column: 'done',
      },
    ];
  }
}
