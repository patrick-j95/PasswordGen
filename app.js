(() => {

    const p1 = Object.assign(document.createElement('p'), {
        innerText: 'Password length :'
    });

    const slider = Object.assign(document.createElement('input'), {
        id: "pwdLength", type: "range", min: "8", max: "50"
    });

    const lenBox = Object.assign(document.createElement('input'), {
        id: "pwdLenBox", type: "number", name: "pwdLenBox", min: "8", max: "50", step: "1"
    });

    const p2 = Object.assign(document.createElement('p'), {
        innerText: 'Must include :'
    });

    const s1 = Object.assign(document.createElement('span'), {
        innerText: 'First date', style: "margin-left: 15%; margin-top: 5px; float: left;"
    });

    const d1 = Object.assign(document.createElement('input'), {
        id: "firstDate", type: "date", title: "Enter first date", value: localStorage.getItem('firstDate') ?? "2017-06-01", style: "height: 30px; border-radius: 5px; margin-left: 6.7%; float: left; cursor: pointer;"
    });

    const s2 = Object.assign(document.createElement('span'), {
        innerText: 'Second date', style: "margin-right: 12.67%; margin-top: 5px; float: right;"
    });

    const d2 = Object.assign(document.createElement('input'), {
        id: "secondDate", type: "date", title: "Enter second date", value: localStorage.getItem('secondDate') ?? "2005-03-01", style: "height: 30px; border-radius: 5px; margin-right: 6.7%; float: right; cursor: pointer;"
    });

    const h3 = Object.assign(document.createElement('h3'), {
        innerText: `Get the duration between two dates`,
        style: "margin-top: 45px;"
    });


    const generatePassword = (len = 16, lwC = true, upC = true, num = true, sym = true) => {

        if (len < 8 || len > 50) return 'Password length should be at least 8 & at most 50';

        const lowercase = [97, 122];
        const uppercase = [65, 90];
        const numbers = [48, 57];
        const specialChars = ['#', '$', '%', '&', '+', '@', '!', '^', '*', '~', '?', '_'];

        let decArr = [];

        lwC ? decArr.push('lwC') : 1;
        upC ? decArr.push('upC') : 1;
        num ? decArr.push('num') : 1;
        sym ? decArr.push('sym') : 1;

        const n = decArr.length;

        if (!Boolean(n)) return `Must choose at least one option`;

        const parLen = Math.floor(len / n);

        let passArr = [];

        for (let i = 0; i < parLen; i++) {
            if (lwC) {
                let small = Math.floor(Math.random() * (lowercase[1] - lowercase[0] + 1)) + lowercase[0];
                passArr.push(String.fromCharCode(small));
            }
            if (upC) {
                let big = Math.floor(Math.random() * (uppercase[1] - uppercase[0] + 1)) + uppercase[0];
                passArr.push(String.fromCharCode(big));
            }
            if (num) {
                let dig = Math.floor(Math.random() * (numbers[1] - numbers[0] + 1)) + numbers[0];
                passArr.push(String.fromCharCode(dig));
            }
            if (sym) {
                passArr.push(specialChars[Math.floor(Math.random() * specialChars.length)]); //Math.random() will never return 1
            }
        }

        if (Boolean(len - passArr.length)) {

            const arbitrator = decArr[Math.floor(Math.random() * decArr.length)]; //Math.random() will never return 1

            while ((len - passArr.length) !== 0) {
                if (arbitrator === 'lwC') {
                    let small = Math.floor(Math.random() * (lowercase[1] - lowercase[0] + 1)) + lowercase[0];
                    passArr.push(String.fromCharCode(small));
                }
                else if (arbitrator === 'upC') {
                    let big = Math.floor(Math.random() * (uppercase[1] - uppercase[0] + 1)) + uppercase[0];
                    passArr.push(String.fromCharCode(big));
                }
                else if (arbitrator === 'num') {
                    let dig = Math.floor(Math.random() * (numbers[1] - numbers[0] + 1)) + numbers[0];
                    passArr.push(String.fromCharCode(dig));
                }
                else {
                    passArr.push(specialChars[Math.floor(Math.random() * specialChars.length)]); //Math.random() will never return 1
                }
            }
        }

        let password = '';
        while (passArr.length) {
            let randomIdx = Math.floor(Math.random() * passArr.length); //Math.random() will never return 1
            password += passArr.splice(randomIdx, 1)[0];
        };

        return password;

    };


    const E = new Date(0);
    const EY = E.getFullYear();
    const EM = E.getMonth();
    const ED = E.getDate();

    const getDuration = (a, b) => {
        if (Boolean(a && b)) {
            const dt1 = new Date(a).setHours(0, 0, 0, 0);
            const dt2 = new Date(b).setHours(0, 0, 0, 0);
            const duration = Math.abs(dt1 - dt2);
            const diff = new Date(duration);
            const rr = { years: Math.abs(diff.getFullYear() - EY), months: Math.abs(diff.getMonth() - EM), days: Math.abs(diff.getDate() - ED) };
            if (rr.years > 0 && rr.months >= 0 && rr.days >= 0) {
                return `${rr.years.toLocaleString()} years, ${rr.months.toLocaleString()} months and ${rr.days.toLocaleString()} days\nOr ${(rr.years * 12 + rr.months).toLocaleString()} months and ${rr.days.toLocaleString()} days\nOr ${Math.floor(duration / (1000 * 3600 * 24)).toLocaleString()} days`;
            }
            else if (rr.years === 0 && rr.months > 0 && rr.days > 0) {
                return `${rr.months.toLocaleString()} months and ${rr.days.toLocaleString()} days\nOr ${Math.floor(duration / (1000 * 3600 * 24)).toLocaleString()} days`;
            }
            else if (rr.years === 0 && rr.months > 0 && rr.days === 0) {
                return `${rr.months.toLocaleString()} months\nOr ${Math.floor(duration / (1000 * 3600 * 24)).toLocaleString()} days`
            }
            else if (rr.years === 0 && rr.months === 0 && rr.days > 0) {
                return `${rr.days.toLocaleString()} days`;
            }
            else {
                return `${rr.years.toLocaleString()} years, ${rr.months.toLocaleString()} months and ${rr.days.toLocaleString()} days`;
            }
        }
        else {
            return `Invalid entry`;
        }
    };


    window.onload = () => {

        const radBtns = document.querySelectorAll('input[type=radio]');


        const mainTitle = document.querySelector('#currentMode');


        const inputDiv = document.querySelector('#userinput');
        inputDiv.innerHTML = '';


        slider.oninput = function () {

            lenBox.value = this.value;
            localStorage.setItem('pwdLen', this.value);
            const progress = ((this.value - this.min) / (this.max - this.min)) * 100;
            this.style.background = `linear-gradient(to right, skyblue ${progress}%, #40444b ${progress}%)`;

        };


        lenBox.onchange = function () {
            let v = this.value;
            v = Math.round(v);
            if (v > 50) {
                v = 50;
            }
            else if (v < 8) {
                v = 8;
            }
            this.value = v;
            localStorage.setItem('pwdLen', v);
            slider.value = v;
            const progress = ((v - slider.min) / (slider.max - slider.min)) * 100;
            slider.style.background = `linear-gradient(to right, skyblue ${progress}%, #40444b ${progress}%)`;
        };


        const divCon = document.createElement('div');
        divCon.append(slider, lenBox);


        const br1 = document.createElement('br');
        const br2 = document.createElement('br');


        const idObj = { 'uppercase': 'A - Z', 'lowercase': 'a - z', 'numbers': '0 - 9', 'symbols': '#$@!%?&+^*_~' };


        let optionsHTML = '';

        for (let id in idObj) {
            optionsHTML += `<div><input type="checkbox" name="${id}" id="${id}"><label for="${id}">${idObj[id]}</label></div>`;
        }


        const resBox = document.querySelector('#result');


        const copyBtn = document.querySelector('#copyBtn');

        copyBtn.onclick = () => {
            navigator.clipboard.writeText(resBox.innerText);
        };


        const generateBtn = document.querySelector('#generateBtn');


        [d1, d2].forEach(x => {
            x.onchange = function () {
                localStorage.setItem(this.id, this.value);
                generateBtn.disabled = generateBtn.disabled = !Boolean(d1.value && d2.value);
            };
        });


        const action1 = () => {
            localStorage.setItem('currentMode', 0);

            mainTitle.innerText = `Password Generator`;

            resBox.classList.add('leftfloat');
            resBox.title = 'Generated Password';
            resBox.innerText = '';

            copyBtn.classList.add('rightfloat');
            copyBtn.classList.remove('invisible');

            inputDiv.style.textAlign = 'left';
            inputDiv.innerHTML = optionsHTML;
            inputDiv.prepend(p1, divCon, br1, br2, p2);

            let initVal = +(localStorage.getItem('pwdLen') ?? 16);
            slider.value = initVal;
            const progress = ((initVal - slider.min) / (slider.max - slider.min)) * 100;
            slider.style.background = `linear-gradient(to right, skyblue ${progress}%, #40444b ${progress}%)`;
            lenBox.value = initVal;

            Object.keys(idObj).forEach(id => {
                document.querySelector(`#${id}`).onclick = function () {
                    localStorage.setItem(this.id, this.checked);
                    generateBtn.disabled = !Boolean(document.querySelectorAll('input[type=checkbox]:checked').length);
                };
                document.querySelector(`#${id}`).checked = JSON.parse(localStorage.getItem(id) ?? true);
            });

            generateBtn.innerText = 'Generate';
            generateBtn.title = 'Generate Password';
            generateBtn.disabled = !Boolean(document.querySelectorAll('input[type=checkbox]:checked').length);
            generateBtn.click();
            copyBtn.disabled = !Boolean(resBox.innerText.length);
        }

        radBtns[0].onchange = action1;


        const action2 = () => {
            localStorage.setItem('currentMode', 1);

            mainTitle.innerText = `Duration Calculator`;

            resBox.classList.remove('leftfloat');
            resBox.title = 'Duration';
            resBox.innerText = '';

            copyBtn.classList.remove('rightfloat');
            copyBtn.classList.add('invisible');

            inputDiv.innerHTML = '';
            inputDiv.style.textAlign = 'center';
            inputDiv.append(s1, s2, br1, d1, d2, br2, h3);

            generateBtn.innerText = 'Duration';
            generateBtn.title = 'Get Duration';
            generateBtn.disabled = !Boolean(d1.value && d2.value);
            generateBtn.click();
        }

        radBtns[1].onchange = action2;


        generateBtn.onclick = () => {
            if (radBtns[0].checked) {
                const len = slider.value;
                const upC = document.querySelector('#uppercase').checked;
                const lwC = document.querySelector('#lowercase').checked;
                const nums = document.querySelector('#numbers').checked;
                const sym = document.querySelector('#symbols').checked;
                resBox.innerText = generatePassword(len, lwC, upC, nums, sym);
                copyBtn.disabled = !Boolean(resBox.innerText.length);
            } else {
                resBox.innerText = getDuration(d1.value, d2.value);
            }
        };


        radBtns[+(localStorage.getItem('currentMode') ?? 0)].checked = true;
        Boolean(+(localStorage.getItem('currentMode') ?? 0)) ? action2() : action1();

    };

})();