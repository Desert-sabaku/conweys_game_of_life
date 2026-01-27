// HTMLの管理とユーザーインタラクションの処理

import { GameOfLife } from "./module/GameOfLife.js";
import { GameOfLifeRenderer } from "./module/GameOfLifeRenderer.js";
import { CanvasController } from "./module/CanvasController.js";

const BTN_TEXT = ["開始", "停止"];

const game = new GameOfLife(20, 40);
const renderer = new GameOfLifeRenderer(game, "canvas", 20);
const controller = new CanvasController(game, renderer, "canvas");

const toggleBtn = document.getElementById("toggleBtn");
const clearBtn = document.getElementById("clearBtn");
const randomBtn = document.getElementById("randomBtn");
const randomSlider = document.getElementById("randomSlider");

let isRunning = false;
let animationId = null;

renderer.render();

toggleBtn.addEventListener("click", () => {
    if (isRunning) {
        isRunning = false;
        if (animationId) {
            clearTimeout(animationId);
            animationId = null;
        }
        toggleBtn.textContent = BTN_TEXT[0];
        clearBtn.disabled = false;
        randomBtn.disabled = false;
        randomSlider.disabled = false;
        controller.setEnabled(true);
    } else {
        isRunning = true;
        toggleBtn.textContent = BTN_TEXT[1];
        clearBtn.disabled = true;
        randomBtn.disabled = true;
        randomSlider.disabled = true;
        controller.setEnabled(false);
        animate();
    }
});

document.getElementById("clearBtn").addEventListener("click", () => {
    game.clear();
    renderer.render();
    updateGenerationDisplay();
});

document.getElementById("randomBtn").addEventListener("click", () => {
    const prob = parseFloat(randomSlider?.value || "0.5");
    game.randomize(prob);
    renderer.render();
});

function animate() {
    if (!isRunning) return;

    game.nextGeneration();
    renderer.render();
    updateGenerationDisplay();

    animationId = setTimeout(() => animate(), 100);
}

function updateGenerationDisplay() {
    const generationText = document.getElementById("generationText");
    if (generationText) {
        generationText.textContent = `Generation: ${game.generation}`;
    }
}

updateGenerationDisplay();
