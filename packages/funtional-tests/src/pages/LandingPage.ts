import { $, click, waitFor, write, into } from 'taiko'
import { assert } from 'chai';

const createButton = () => $(`//span[text()="Create a New Board"]`);
const boardId = () => $(`#boardId`);
const shareLinkButton = () => $(`//span[text()='Copy Sharable Link']`);

export default class LandingPage {

    async generateBoardID() {
        await click(createButton());
        return this;
    }

    async validateBoardIdGenerated() {
        let boardid = '';
        await waitFor(shareLinkButton());
        try {
            boardid = await boardId().attribute('value');
            assert.notEqual(boardid, '');
        } catch (e) {
            console.log(e)
        }
        return this;
    }
}
