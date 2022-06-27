let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }

window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y != 0) break
            inputDirection = { x: 0, y: -1}
            break
        case 'ArrowDown':
            if (lastInputDirection.y != 0) break
            inputDirection = { x: 0, y: 1}
            break
        case 'ArrowLeft':
            if (lastInputDirection.x != 0) break
            inputDirection = { x: -1, y: 0}
            break
        case 'ArrowRight':
            if (lastInputDirection.x != 0) break
            inputDirection = { x: 1, y: 0}
            break
    }
})

export function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection
}

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if (lastInputDirection.x == 0) {
            if ( xDiff > 0 ) {
                inputDirection = { x: -1, y: 0}/* right swipe */ 
            } else {
                inputDirection = { x: 1, y: 0}/* left swipe */
            }  
        }    
                     
    } else {
        if (lastInputDirection.y == 0){
            if ( yDiff > 0 ) {
                inputDirection = { x: 0, y: -1}/* down swipe */ 
            } else { 
                inputDirection = { x: 0, y: 1}/* up swipe */
            }  
        }                                                               
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};