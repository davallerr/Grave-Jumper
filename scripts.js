
var playerScore, luck, suckUps, roundDifficulty, round, roundScore, decision, gamePlaying;

var victims = ['Meghan', 'Garrett', 'Nick', 'Austin', 'Gail', 'Adrienne', 'Dan', 'Patti', 'Donna', 'Eric', 'Joanne', 'Amelia', 'Cy'];

var story = [ '...Why am I limping? Well, it\'s a crazy story...',
              '...So, I\'m part of a Portland tag team...',
              '...We were playing a game of tag in the graveyard...',
              '...I was running around dodging graves...',
              '...I almost got caught so I started jumping over graves...',
              '...and then I tripped...',
              '...and fell over the top of a grave...',
              '...into an open grave...',
              '...down to the very bottom...',
              '...and that is how...',
              '...I sprained my ankle...',
              '...can you even believe...',
              '...it?'];

var compliments = [ 'Have I mentioned how nice you look today?',
                    'I happen to like the way your upper lip looks.',
                    'You are a valued member of this team.',
                    'Honestly I hate everyone here except you.',
                    'You could be a part time model.',
                    'I don\'t care what everyone says, you\'re alright.',
                    'You look like you know your way around a bar fight.',
                    'Looks like somebody didn\'t skip leg day!',
                    'You just make me feel... safe.'];

var insults = ['rube', 'nerd', 'doorknob', 'goob', 'saucepan', 'nerf-herder', 'nimrod', 'gumball', 'sillybilly', 'chip-clip'];

// initialize game on load
init();

// initialize game function
function init() {
  playerScore = 0;
  luck = Math.floor(Math.random() * 8) + 1;
  suckUps = 0;
  roundDifficulty = 0;
  round = -1;
  gamePlaying = true;

  document.getElementById('window-start').style.display = 'block';
  document.getElementById('window-game').style.display = 'none';
  document.getElementById('player-luck').textContent = '0';
  document.getElementById('suck-ups').textContent = '0';
  document.getElementById('difficulty').textContent = '0';
  document.getElementById('score').textContent = '0';
  document.getElementById('story-box').textContent = '';
  document.getElementById('btn-next').style.visibility = 'hidden';
  document.getElementById('result').style.display = 'none';
}

// start playing
function jumper() {
  document.getElementById('window-start').style.display = 'none';
  document.getElementById('window-game').style.display = 'block';
  document.getElementById('player-luck').textContent = luck;
  document.getElementById('suck-ups').textContent = suckUps;

  nextRound();

  // function to setup next round
  function nextRound() {
    if(round < victims.length) {
      console.log('round pre-increment: ' + round);
      round++;
      console.log('round post-increment: ' + round);

      // remove next button
      document.getElementById('btn-next').style.visibility = 'hidden';

      // set round info
      roundDifficulty = round + (Math.floor(Math.random() * (round + (round / 2) - (round / 2))) + 1);
      console.log('round difficulty: ' + roundDifficulty);
      roundScore = 10;

      // populate round information
      document.getElementById('victim-name').textContent = victims[round];
      document.getElementById('difficulty').textContent = roundDifficulty;
      document.getElementById('story-box').textContent = 'You run into ' + victims[round] + '. Are you going to try and trick them?';

      // make action buttons clickable
      document.getElementById('btn-compliment').addEventListener('click', compliment);
      document.getElementById('btn-lie').addEventListener('click', lie);
      document.getElementById('btn-quit').addEventListener('click', comeClean);
    } else {
      showResult();
    }
  }

  // function that shows results
  function showResult() {
    // show result display
    document.getElementById('result').style.display = 'block';
    document.getElementById('btn-reset').style.display = 'block';
    document.getElementById('final-score').textContent = playerScore;

    // remove function of action buttons
    document.getElementById('btn-compliment').removeEventListener('click', compliment);
    document.getElementById('btn-lie').removeEventListener('click', lie);
    document.getElementById('btn-quit').removeEventListener('click', comeClean);

    // show reset button
    document.getElementById('btn-reset').addEventListener('click', init);

    gamePlaying = false;
  }

  // function to lie to victim
  function lie() {
    if(gamePlaying) {
      var roundLuck = luck + (Math.floor(Math.random() * ((luck + round) - (luck - round))) + 1);
      console.log('round luck: ' + roundLuck);

      var randInsult = Math.floor(Math.random() * insults.length);

      document.getElementById('story-box').textContent = story[round];

      // successful lie
      if(roundLuck > roundDifficulty) {
        playerScore += roundScore;
        document.getElementById('score').textContent = playerScore;
        document.getElementById('btn-next').textContent = 'You make a real ' + insults[randInsult] + ' out of ' + victims[round] + '. Click to be on your way.';
        document.getElementById('btn-next').style.visibility = 'visible';

        // remove function of action buttons
        document.getElementById('btn-compliment').removeEventListener('click', compliment);
        document.getElementById('btn-lie').removeEventListener('click', lie);
        document.getElementById('btn-quit').removeEventListener('click', comeClean);
      } else {
        // remove points for being caught and send to results
        var penalty = Math.floor(Math.random() * (round * 10)) + 1;
        playerScore -= penalty;
        console.log('penalty for being caught: ' + penalty);
        document.getElementById('story-box').textContent = victims[round] + ' isn\'t buying it. They call you a filthy ' + insults[randInsult] + ' and walk away.';
        showResult();
      }
    }
  }

  // function to compliment victim to lower difficulty and possible roundScore
  function compliment() {
    if(gamePlaying) {
      var randCompliment = Math.floor(Math.random() * compliments.length);
      document.getElementById('story-box').textContent = compliments[randCompliment];
      roundDifficulty -= Math.floor(Math.random() * ((round) / 2)) + round;
      roundScore -= Math.floor(Math.random() * (10 - 5) + 5);
      console.log('post-compliment difficulty: ' + roundDifficulty);
      console.log('post-compliment roundScore: ' + roundScore);
      suckUps += 1;
      document.getElementById('suck-ups').textContent = suckUps;
    }
  }

  // function to come clean and end game
  function comeClean() {
    if(gamePlaying) {
      showResult();
    }
  }

  // function for next round button
  document.getElementById('btn-next').addEventListener('click', function() {
    nextRound();
  });
}
