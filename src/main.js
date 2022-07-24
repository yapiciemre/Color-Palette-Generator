let colorPalette = document.getElementById('color-palette');
let currentElem;

function notification(msg){

    let old_div = document.querySelector('.alert');
    if (old_div){
        old_div.parentNode.removeChild(old_div);
    }

    let div = document.createElement('div');
    div.className = 'alert';
    div.innerHTML = msg;
    document.body.appendChild(div);

    setTimeout(() => div.classList.add('active'), 1);
    setTimeout(() => div.classList.remove('active'), 1000);

}

function generateColorPalette(){
    colorPalette.innerHTML = '';
    for (let i = 1; i <= 5; i++){

        let color = generateColor();

        let li = document.createElement('li');

        let spanColor = document.createElement('span');
        spanColor.className = 'color';
        spanColor.style.setProperty('--color', color);
        let spanText = document.createElement('span');
        spanText.className = 'text';
        spanText.innerText = color;
        let input = document.createElement('input');
        input.name = 'color';
        input.value = color;

        li.appendChild(spanColor);
        li.appendChild(spanText);
        li.appendChild(input);
        colorPalette.appendChild(li);

        li.addEventListener('mouseover', (e) => {
            currentElem = e.target.parentNode;
        });

        li.addEventListener('click', (e) => {
            let targetInput = e.target.parentNode.querySelector('input[name="color"]');
            targetInput .select();
            document.execCommand('copy');
            notification('Color <b>' + targetInput.value  + '</b> copied to your clipboard')
        });
    }
}

function generateColor(){
    let str = 'abcdef0123456789';
    let color = '#';
    for (let i = 0; i <= 5; i++) {
        color += str[Math.floor(Math.random() * str.length)];
    }
    return color;
}

window.addEventListener('keypress', (e) => {
    if (e.keyCode === 32){
        generateColorPalette();
    } else if (e.keyCode === 99 && currentElem){
        let targetInput = currentElem.querySelector('input[name="color"]');
        targetInput.select();
        document.execCommand('copy');
        notification('Color <b>' + targetInput.value  + '</b> copied to your clipboard');
        document.body.style.background = targetInput.value;
    }
    e.preventDefault();
});

generateColorPalette();