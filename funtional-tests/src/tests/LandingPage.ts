import { $, goto, click, waitFor, write, into } from 'taiko';
import { assert } from 'chai';
import * as LandingPageElements from '../elements/LandingPageElements';

describe('Retro Langing Page Test UI', () => {

   it('Verify the board Id is generated', async () => {

      let boardid='';
      await goto("localhost:3001");
      await click(LandingPageElements.createButton());
      await waitFor(LandingPageElements.shareLinkButton());
      try {
         boardid = await LandingPageElements.boardId().attribute('value');
         assert.notEqual(boardid, '');
      }catch(e){
         console.log(e)
      }
      
   })

})