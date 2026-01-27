// Conway's Game of Life - Pure Logic Class

export class GameOfLife {
    #generation = 0;

    /**
     * Conway's Game of Lifeのコアロジック
     * @param {number} rows - グリッドの行数
     * @param {number} cols - グリッドの列数
     */
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.#createGrid();
    }

    /**
     * 初期化された2次元グリッドを作成（全セル死滅状態）
     * @returns {boolean[][]} 作成されたグリッド
     */
    #createGrid() {
        return Array.from({ length: this.rows }, () =>
            Array(this.cols).fill(false),
        );
    }

    /**
     * グリッドをランダムな状態で初期化
     * @param {number} aliveProbability - セルが生存する確率（0.0～1.0）
     */
    randomize(aliveProbability = 0.5) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j] = Math.random() < aliveProbability;
            }
        }
    }

    /**
     * 指定されたセルの生存している隣接セル数をカウント
     * @param {number} row - 行インデックス
     * @param {number} col - 列インデックス
     * @returns {number} 生存している隣接セルの数
     */
    #getNeighborCount(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const r = row + i;
                const c = col + j;
                if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
                    count += this.grid[r][c] ? 1 : 0;
                }
            }
        }
        return count;
    }

    /**
     * Conway's Game of Lifeのルールに従って次世代に進める
     * - 生存セル: 隣接する生存セルが2または3個なら生存、それ以外は死滅
     * - 死亡セル: 隣接する生存セルがちょうど3個なら誕生
     */
    nextGeneration() {
        const newGrid = this.#createGrid();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const neighbors = this.#getNeighborCount(i, j);
                if (this.grid[i][j]) {
                    newGrid[i][j] = neighbors === 2 || neighbors === 3;
                } else {
                    newGrid[i][j] = neighbors === 3;
                }
            }
        }
        this.grid = newGrid;
        this.#generation++;
    }

    /**
     * グリッドをクリアし、世代をリセット
     */
    clear() {
        this.grid = this.#createGrid();
        this.#generation = 0;
    }

    /**
     * 指定された位置のセルの状態を設定
     * @param {number} row - 行インデックス
     * @param {number} col - 列インデックス
     * @param {boolean} alive - 生存状態
     */
    setCell(row, col, alive) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            this.grid[row][col] = alive;
        }
    }

    /**
     * 指定された位置のセルの状態を取得
     * @param {number} row - 行インデックス
     * @param {number} col - 列インデックス
     * @returns {boolean} セルの生存状態
     */
    getCell(row, col) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            return this.grid[row][col];
        }
        return false;
    }

    /**
     * 現在の世代数を取得
     */
    get generation() {
        return this.#generation;
    }
}
