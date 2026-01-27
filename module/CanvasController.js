// Canvas interaction controller for Game of Life

export class CanvasController {
    /**
     * キャンバス上のマウス操作を管理
     * @param {GameOfLife} game - GameOfLifeインスタンス
     * @param {GameOfLifeRenderer} renderer - レンダラーインスタンス
     * @param {string} canvasId - Canvas要素のID
     */
    constructor(game, renderer, canvasId) {
        this.game = game;
        this.renderer = renderer;
        this.canvas = document.getElementById(canvasId);
        this.isDragging = false;
        this.dragMode = true; // true = 生, false = 死
        this.isEnabled = true;

        this.#setupEventListeners();
    }

    /**
     * イベントリスナーを設定
     */
    #setupEventListeners() {
        this.canvas.addEventListener("mousedown", (e) =>
            this.#handleMouseDown(e),
        );
        this.canvas.addEventListener("mousemove", (e) =>
            this.#handleMouseMove(e),
        );
        this.canvas.addEventListener("mouseup", () => this.#handleMouseUp());
        this.canvas.addEventListener("mouseleave", () => this.#handleMouseUp());
    }

    /**
     * イベント座標からセル座標を取得
     * @param {MouseEvent} event - マウスイベント
     * @returns {{row: number, col: number}} セル座標
     */
    #getCellFromEvent(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const col = Math.floor(x / this.renderer.cellSize);
        const row = Math.floor(y / this.renderer.cellSize);
        return { row, col };
    }

    /**
     * マウスダウンイベントのハンドラ
     * ドラッグ描画を開始
     */
    #handleMouseDown(event) {
        if (!this.isEnabled) return;

        const { row, col } = this.#getCellFromEvent(event);
        if (
            row >= 0 &&
            row < this.game.rows &&
            col >= 0 &&
            col < this.game.cols
        ) {
            this.isDragging = true;
            // クリックしたセルの状態を反転し、その状態をドラッグモードとする
            this.dragMode = !this.game.getCell(row, col);
            this.game.setCell(row, col, this.dragMode);
            this.renderer.render();
        }
    }

    /**
     * マウスムーブイベントのハンドラ
     * ドラッグ中にセルを描画
     */
    #handleMouseMove(event) {
        if (!this.isDragging || !this.isEnabled) return;

        const { row, col } = this.#getCellFromEvent(event);
        if (
            row >= 0 &&
            row < this.game.rows &&
            col >= 0 &&
            col < this.game.cols
        ) {
            if (this.game.getCell(row, col) !== this.dragMode) {
                this.game.setCell(row, col, this.dragMode);
                this.renderer.render();
            }
        }
    }

    /**
     * マウスアップイベントのハンドラ
     * ドラッグ描画を終了
     */
    #handleMouseUp() {
        this.isDragging = false;
    }

    /**
     * コントローラーを有効化/無効化
     * @param {boolean} enabled - 有効化するかどうか
     */
    setEnabled(enabled) {
        this.isEnabled = enabled;
        this.canvas.style.cursor = enabled ? "pointer" : "not-allowed";
    }
}
