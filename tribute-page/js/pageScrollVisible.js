document.addEventListener("DOMContentLoaded", function(event) { 
    var animParentElements = document.querySelectorAll('.pageScrollAnimation');
    
    function isPageScrollVisible(elem) {
        var elemPos = elem.getBoundingClientRect();
        
        return (elemPos.bottom > 0 &&
                      elemPos.right > 0 &&
                      elemPos.left < (window.innerWidth || document.documentElement.clientWidth) &&
                      elemPos.top < (window.innerHeight || document.documentElement.clientHeight));
    }
    
    window.addEventListener('scroll', function() {
        for(var i = 0; i < animParentElements.length; i++){
            if(isPageScrollVisible(animParentElements[i])) {
                var animElement = animParentElements[i].querySelectorAll('.anim-element');
                console.log(animElement.length);
                for(var j = 0; j < animElement.length; j++) {
                    var dataAnimClass = animElement[j].getAttribute('data-animClass');
                    
                    if (animElement[j].classList) {
                        animElement[j].classList.add(dataAnimClass);
                    } else {
                        animElement[j].className += ' '+dataAnimClass;
                    }
                    animElement[j].style.animationDelay = j+'s';
                }
            }
        }
    });
});