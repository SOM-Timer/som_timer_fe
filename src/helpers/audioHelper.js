import gong from "../assets/audio/gong.mp3";
import goodOldSynths from "../assets/audio/goodOldSynths.mp3";
import pianoDreams from "../assets/audio/pianoDreams.mp3";
import chordCliff from "../assets/audio/chordCliff.mp3";
import levelUp from "../assets/audio/levelUp.mp3";
import birdChord from "../assets/audio/birdChord.mp3";

const playAlertSound = (sound) => {
  let audioNotification = "";
  switch (sound) {
    case "chordCliff":
      audioNotification = new Audio(chordCliff);
      break;
    case "gong":
      audioNotification = new Audio(gong);
      break;
    case "goodOldSynths":
      audioNotification = new Audio(goodOldSynths);
      break;
    case "pianoDreams":
      audioNotification = new Audio(pianoDreams);
      break;
    case "levelUp":
      audioNotification = new Audio(levelUp);
      break;
    case "birdChord":
      audioNotification = new Audio(birdChord);
      break;
    default:
      audioNotification = new Audio(goodOldSynths);
  }
  audioNotification.play();
};

export default playAlertSound