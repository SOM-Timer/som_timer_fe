import balineseGong from "../assets/audio/balineseGong.mp3";
import goodOldSynths from "../assets/audio/goodOldSynths.mp3";
import pianoDreams from "../assets/audio/pianoDreams.mp3";
import reverbSplash from "../assets/audio/reverbSplash.mp3";
import levelUp from "../assets/audio/levelUp.mp3";
import birdChord from "../assets/audio/birdChord.mp3";

const notificationSounds = [balineseGong, goodOldSynths, pianoDreams, reverbSplash, levelUp, birdChord]

const getRandomNotification = (sounds) => {
  const randomIndex =  Math.floor(Math.random() * sounds.length)
  console.log(sounds[randomIndex])
  return sounds[randomIndex]
}

export const playAlertSound = (sound) => {
  let audioNotification = "";
  switch (sound) {
    case "reverbSplash":
      audioNotification = new Audio(reverbSplash);
      break;
    case "balineseGong":
      audioNotification = new Audio(balineseGong);
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
    case "random":
      console.log('random!!')
      audioNotification = new Audio(getRandomNotification(notificationSounds))
      break;
    default:
      audioNotification = new Audio(goodOldSynths);
  }
  audioNotification.play();
};