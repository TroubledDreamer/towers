document.addEventListener('DOMContentLoaded', () => {

    let blockLength = 600;
    let speed = 6;
    let gameIsOver = false;
    const blockEnvironment = document.getElementsByClassName('blockEnvironment')[0];
    const score = document.getElementsByClassName('score')[0];

    function createBlock() {
        const newBlock = document.createElement('div');
        newBlock.className = 'block active';
        newBlock.style.width = blockLength + 'px';
        newBlock.style.animationDuration = speed + 's';
        speed = speed - (speed / 10);
        blockEnvironment.prepend(newBlock);
    }

    function stopBlock() {
        const activeBlock = document.querySelector('.block.active');
        if (activeBlock) {
            const computedStyle = window.getComputedStyle(activeBlock);
            const leftValue = computedStyle.getPropertyValue('left');
            activeBlock.classList.remove('active');
            activeBlock.style.left = leftValue;
            adjustEnvironmentWidth();
        }
    }

    function gameOver() {
        gameIsOver = true;
        const gameOverMessage = document.createElement('div');
        gameOverMessage.className = 'gameOverMessage';
        gameOverMessage.innerHTML = 'Game Over Press Space or Tap';
        blockEnvironment.prepend(gameOverMessage);
    }

    function resetGame() {
        blockEnvironment.innerHTML = '';
        blockLength = 600;
        speed = 6;
        gameIsOver = false;
        score.innerHTML = '0';
        createBlock();
    }

    function adjustEnvironmentWidth() {
        const blocks = document.querySelectorAll('.block');
        if (blocks.length > 1) {
            const firstBlock = blocks[0];
            const secondBlock = blocks[1];

            const firstBlockRect = firstBlock.getBoundingClientRect();
            const secondBlockRect = secondBlock.getBoundingClientRect();

            const intersectionLeft = Math.max(firstBlockRect.left, secondBlockRect.left);
            const intersectionRight = Math.min(firstBlockRect.right, secondBlockRect.right);

            const intersectionWidth = Math.max(0, intersectionRight - intersectionLeft);

            blockLength = intersectionWidth;

            if (intersectionWidth <= 0) {
                gameOver();
            } else {
                score.innerHTML = parseInt(score.innerHTML) + 1;
            }
        }
    }

    createBlock();

    function handleAction() {
        if (!gameIsOver) {
            stopBlock();
            createBlock();
        } else {
            resetGame();
        }
    }

    // Listen for space key press
    document.addEventListener('keydown', event => {
        if (event.code === 'Space') {
            handleAction();
        }
    });

    // Listen for tap on mobile
    document.addEventListener('touchstart', () => {
        handleAction();
    });

    // Bird creation code (if still relevant in your game)
    const birdContainerWrapper = document.querySelector('.bird-container-wrapper');

    function createRandomBird() {
        const birdContainer = document.createElement('div');
        birdContainer.className = 'bird-container';

        const bird = document.createElement('div');
        bird.className = 'bird';

        const birdType = Math.floor(Math.random() * 4) + 1;
        bird.classList.add(`bird-${birdType}`);
        birdContainer.classList.add(`bird-container-${birdType}`);

        birdContainer.appendChild(bird);
        birdContainerWrapper.appendChild(birdContainer);

        const randomTop = Math.random() * 80 + 10;
        birdContainer.style.top = `${randomTop}vh`;

        const randomDelay = Math.random() * 5;
        birdContainer.style.animationDelay = `${randomDelay}s`;

        setTimeout(() => {
            birdContainerWrapper.removeChild(birdContainer);
        }, 16000);
    }

    function startBirdGeneration() {
        setInterval(() => {
            createRandomBird();
        }, Math.random() * 5000 + 2000);
    }

    startBirdGeneration();

});
