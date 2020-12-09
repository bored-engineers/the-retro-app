import { $, goto, click, waitFor, write, into } from 'taiko';
import { assert } from 'chai';
import LandingPage from '../pages/LandingPage';

describe('Retro Langing Page Test UI', () => {

   it('Verify the board Id is generated', async () => {
      const LandingPageElements = new LandingPage();
      let boardid='';
      await goto("localhost:3001");
      await LandingPageElements.generateBoardID();
      await LandingPageElements.validateBoardIdGenerated();
      
      
   })

})