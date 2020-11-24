import { $ } from 'taiko';

export const createButton = () => $(`//span[text()="Create a New Board"]`);
export const boardId = () => $(`#boardId`);
export const shareLinkButton = () => $(`//span[text()='Copy Sharable Link']`);
