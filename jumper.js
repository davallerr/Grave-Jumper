function jumper() {

// Starting Values
var playerScore = 0;
var luck = Math.random() * 11.5;
var lieMeter = 1;
var gulliblePeople = new Array('Meghan', 'Garrett', 'Nick', 'Austin', 'Gail', 'Adrienne', 'Dan', 'Patti', 'Donna', 'Eric', 'Joanne', 'Amelia', 'Cy');
var i = 0;
var fakeStory = new Array('...Why am I limping? Well, it is a crazy story...', '...So, I\'m part of a Portland tag team...', '...We were playing a game of tag in the graveyard...', '...I was running around dodging graves...', '...I almost got caught so I started jumping over graves...', '...and then I tripped...', '...and fell over the top of a grave...', '...into an open grave...', '...down to the very bottom...', '...and that is how...', '...I sprained my ankle...', '...can you even believe...', '...it?')
var decision = 'y';

// Lie Function
function lieTime() {
    decision = prompt('You run into ' + gulliblePeople[i] + '. Are you going to try and trick them? Type "y" or "n" below.');
        
// Successful Dupe
        if (decision === 'y') {
         lieMeter = i + luck;
            
            if (lieMeter < 10) {
                console.log('"' + fakeStory[i] + '"');
                console.log(gulliblePeople[i] + ' totally believes you.');
                playerScore = playerScore + 10;
            i++;
            }
            
            else {
                console.log(fakeStory[i]);
                console.log('"You are such a liar." ' + gulliblePeople[i] + ' says to you.');
                lieMeter = 15;
                playerScore = playerScore - 30;
                console.log('You lose 30 points.');
            }
    }
    
        else {
            console.log('Good job. You quit while you were ahead.');
            lieMeter = 15;
        }
}

// Story
console.log('Your goal is to get as many people to believe your story as possible.');
console.log('Each turn decide whether to keep stretching the truth or stop while you are ahead.');
console.log('Each person you trick will earn you 10 points.');
console.log('If you get caught, then you lose 30 points.');

// Game
while (lieMeter < 10 && playerScore < 130) {
    lieTime();
}

if (playerScore === 130) {
    console.log('Congratulations. You just duped the entire digital marketing department!');
}

console.log('You end with ' + playerScore + ' points!');
    
    
}