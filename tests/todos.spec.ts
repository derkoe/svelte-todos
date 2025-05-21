import { test, expect } from '@playwright/test';

test.describe('Todos Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/todos');
		// Clear any existing todos from previous test runs to ensure a clean state
		// This is important if tests don't clean up after themselves and the app persists data.
		// For this app, todos are in-memory per page load or fetched, so this might not be strictly necessary
		// unless there's actual persistence across test runs without server restart.
		// A more robust way for true e2e might be resetting db or using unique user sessions.
		// For now, we assume tests either clean up or page reloads provide a fresh start.
	});

	test('should allow me to add a new todo item', async ({ page }) => {
		const newTodoText = 'Test new todo item';
		// Selector for Skeleton input (rendered as <input name="text">)
		await page.locator('input[name="text"]').fill(newTodoText);
		// Selector for Skeleton button (rendered as <button class="variant-filled-primary">Add Todo</button>)
		await page.locator('button.variant-filled-primary:has-text("Add Todo")').click();
		
		// Check within a Card that contains the todo text.
		// Skeleton Card is a div with class 'card'. Each todo item is wrapped in such a card.
		// We also look for the specific text within that card structure.
		const todoItemCard = page.locator('div.card', { hasText: newTodoText });
		await expect(todoItemCard.locator(`span:text-is("${newTodoText}")`)).toBeVisible();
	});

	test('should allow me to mark an item as completed', async ({ page }) => {
		const todoToMarkText = 'Todo to mark as done';
		// Add a todo first
		await page.locator('input[name="text"]').fill(todoToMarkText);
		await page.locator('button.variant-filled-primary:has-text("Add Todo")').click();
		
		// Find the card containing the todo
		const todoItemCard = page.locator('div.card', { hasText: todoToMarkText });
		// The checkbox is an input type="checkbox" within this card
		const checkbox = todoItemCard.locator('input[type="checkbox"]');
		
		// Ensure it's not checked initially (or handle if it can be)
		await expect(checkbox).not.toBeChecked();

		await checkbox.check();
		await expect(checkbox).toBeChecked();
		
		// Verify line-through style on the span containing the text
		// The span class is dynamically computed: "flex-grow {todo.done ? 'text-gray-400 line-through' : ''}"
		await expect(todoItemCard.locator(`span:text-is("${todoToMarkText}")`)).toHaveClass(/line-through/);
	});

	test('should allow me to delete a todo item', async ({ page }) => {
		const todoToDeleteText = 'Todo to delete';
		// Add a todo first
		await page.locator('input[name="text"]').fill(todoToDeleteText);
		await page.locator('button.variant-filled-primary:has-text("Add Todo")').click();
		
		const todoItemCard = page.locator('div.card', { hasText: todoToDeleteText });
		// Ensure it's visible before trying to delete
		await expect(todoItemCard.locator(`span:text-is("${todoToDeleteText}")`)).toBeVisible();

		// Selector for Skeleton delete button (rendered as <button class="variant-soft-error">Delete</button>)
		await todoItemCard.locator('button.variant-soft-error:has-text("Delete")').click();
		
		// The card containing the todo item should no longer be visible
		await expect(todoItemCard).not.toBeVisible();
	});
});
