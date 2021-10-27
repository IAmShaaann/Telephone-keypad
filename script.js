// fetched all the tags in order to manuplate them later in the code.
var button = document.querySelectorAll('button'),
    input = document.querySelector('input'),
    // created essential variables. 
    busy = true,
    hold,
    is_busy,
    delay = 1000,
    change = -1,
    click = null;

//now work on each case moving ahead.  
for (var i = 0, len = button.length; i < len; ++i) {
    // as soon as we enter any button case: we run the function. 
    button[i].onmousedown = function (e) {
        var text = this.getAttribute('data-text').split(""), //text will store the text content of the respective number. 
            number = this.getAttribute('data-number'); //and number will store the respective number to the button. 
        busy = true; // turn busy to true. 
        clearTimeout(is_busy); 
        if (click !== e.target) { // and if click is not equal to the target value like click 2 thrice and get 'c' is not equal to target so make the busy false to enter another character.
            busy = false;
        }

        if (change >= text.length - 1 || click !== e.target) {
            change = 0;
            click = e.target;
        } else {
            change = change + 1;
        }
        if (text[0] === '$') { //this case handles the backspace it just removes the last char from the input. 
            input.value = input.value.slice(0, -1);
            hold = setTimeout(function () {
                input.value = "";
            }, delay);
            return;
        }
        hold = setTimeout(function () {
            input.value = input.value.slice(0, -1) + number;
        }, delay);
        input.value = busy ? input.value.slice(0, -1) + text[change] : input.value + text[change];
    };
    button[i].onmouseup = function (e) {
        clearTimeout(hold);
        //this function runs for basically reseting the variables changed so far as soon as we shift from the button, 
        busy = true;
        is_busy = setTimeout(function () {
            change = -1;
            busy = false;
            e.target = null;
        }, delay);
        // put caret at the end of text input
        input.focus();
        input.selectionStart = input.selectionEnd = input.value.length;
    };
}