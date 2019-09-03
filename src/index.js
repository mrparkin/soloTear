import _ from "lodash";
import printMe from "./print.js";
import "./scss/index.scss";

//____________________________________________________________________________________________________________________________________________

("use strict"); /* jshint -W097 */

function isHigher(selected, target) {
  selected = convertToNumber(selected.toString());
  target = convertToNumber(target.toString());
  if (selected != target + 1) {
    return false;
  }
}

import { BuildDeck } from "./models/buildDeck.js";

//FIRST TIME USING CLASSES HERE SO BECAREFUL >>> START WITH CLASS FOR BUILDING && DEALING THE DECK
let _buildDeck = new BuildDeck();
let deck = _buildDeck.createDeck();

//______________________________________________________________________________________________________________________________________
