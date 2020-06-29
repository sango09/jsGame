const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const LAST_LEVEL = 5


class Game {
    constructor() {
        this.initialize()
        this.generateSequence()
        setTimeout(this.nextLevel, 500)
    }

    initialize() {
        this.chooseColor = this.chooseColor.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
        this.initialize = this.initialize.bind(this)
        this.toggleBtnStart()
        this.score = 0
        this.level = 1
        this.colors = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnStart() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generateSequence() {
        this.sequence = new Array(LAST_LEVEL).fill(0)
            .map(n => Math.floor(Math.random() * 4))
    }

    nextLevel() {
        this.subLevel = 0
        this.iluminationSequence()
        this.addEventClick()
        this.currentScore()
        document.getElementById('currentLevel').innerHTML = this.level;
    }

    currentScore() {
        document.getElementById('score').innerHTML = this.score;
    }

    transformNumberToColor(number) {
        switch (number) {
            case 0:
                return 'celeste'
            case 1:
                return 'verde'
            case 2:
                return 'violeta'
            case 3:
                return 'naranja'
        }
    }

    transformColorToNumber(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'verde':
                return 1
            case 'violeta':
                return 2
            case 'naranja':
                return 3
        }
    }


    iluminationSequence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.transformNumberToColor(this.sequence[i])
            setTimeout(() => this.iluminationColor(color), 1000 * i)
        }
    }

    iluminationColor(color) {
        this.colors[color].classList.add('light')
        setTimeout(() => this.shutDown(color), 350)
    }

    shutDown(color) {
        this.colors[color].classList.remove('light')
    }

    addEventClick() {
        this.colors.celeste.addEventListener('click', this.chooseColor)
        this.colors.verde.addEventListener('click', this.chooseColor)
        this.colors.violeta.addEventListener('click', this.chooseColor)
        this.colors.naranja.addEventListener('click', this.chooseColor)
    }

    eliminateEventClick() {
        this.colors.celeste.removeEventListener('click', this.chooseColor)
        this.colors.verde.removeEventListener('click', this.chooseColor)
        this.colors.violeta.removeEventListener('click', this.chooseColor)
        this.colors.naranja.removeEventListener('click', this.chooseColor)
    }

    chooseColor(ev) {
        const nameColor = ev.target.dataset.color
        const numberColor = this.transformColorToNumber(nameColor)
        this.iluminationColor(nameColor)
        if (numberColor === this.sequence[this.subLevel]) {
            this.score += 5
            this.currentScore()
            this.subLevel++
            if (this.subLevel === this.level) {
                this.level++
                // this.eliminateEventClick()
                if (this.level === (LAST_LEVEL + 1)) {
                    this.winGame()
                } else {
                    setTimeout(this.nextLevel, 1500)
                }

            }
        } else {
            this.lostGame()
        }
    }

    winGame() {
        swal('Ganaste', 'Felicidades, ganaste el juego!', 'success')
            .then(this.initialize)
        this.resetValues()
    }

    lostGame() {
        swal('Perdiste', 'Lo lamentamos, perdite el juego :(', 'error')
            .then(() => {
                this.eliminateEventClick()
                this.resetValues()
                this.initialize()

            })
    }

    resetValues() {
        document.getElementById('score').innerHTML = '0'
        document.getElementById('currentLevel').innerHTML = '1'
    }
}


function startGame() {
    window.game = new Game()
}