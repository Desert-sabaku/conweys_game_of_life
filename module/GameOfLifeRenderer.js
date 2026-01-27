// Canvas Rendering for Game of Life

export class GameOfLifeRenderer {
    /**
     * GameOfLifeの描画を担当
     * @param {GameOfLife} game - GameOfLifeインスタンス
     * @param {string} canvasId - Canvas要素のID
     * @param {number} cellSize - セルのサイズ（ピクセル）
     */
    constructor(game, canvasId, cellSize = 10) {
        this.game = game;
        this.cellSize = cellSize;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.game.cols * this.cellSize;
        this.canvas.height = this.game.rows * this.cellSize;
    }

    /**
     * 現在のグリッド状態をキャンバスに描画
     */
    render() {
        this.#clearCanvas();
        this.#drawGridLines();
        this.#drawCells();
    }

    /**
     * キャンバスをクリア
     */
    #clearCanvas() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * グリッド線を描画
     */
    #drawGridLines() {
        this.ctx.strokeStyle = "#ccc";

        // 水平線
        for (let i = 0; i <= this.game.rows; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.cellSize);
            this.ctx.lineTo(this.canvas.width, i * this.cellSize);
            this.ctx.stroke();
        }

        // 垂直線
        for (let j = 0; j <= this.game.cols; j++) {
            this.ctx.beginPath();
            this.ctx.moveTo(j * this.cellSize, 0);
            this.ctx.lineTo(j * this.cellSize, this.canvas.height);
            this.ctx.stroke();
        }
    }

    /**
     * 生存セルを描画
     */
    #drawCells() {
        this.ctx.fillStyle = "black";
        for (let i = 0; i < this.game.rows; i++) {
            for (let j = 0; j < this.game.cols; j++) {
                if (this.game.grid[i][j]) {
                    this.ctx.fillRect(
                        j * this.cellSize,
                        i * this.cellSize,
                        this.cellSize,
                        this.cellSize,
                    );
                }
            }
        }
    }
}
