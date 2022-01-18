import React, { Component } from "react";
import Cell from './Cell'
import './Board.css'

class Board extends Component {
    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chanceLightStartsOn: 0.25
    };

    constructor(props) {
        super(props);
        this.state = {
            hasWon: false,
            board: this.createBoard()
        };
    }

    createBoard() {
        let board = [];
        for (let x = 0; x < this.props.nrows; x++) {
            let row = [];
            for (let y = 0; y < this.props.ncols; y++) {
                row.push(Math.random() < this.props.chanceLightStartsOn);
            }
            board.push(row)
        }

        return board;
    }

    flipCellsAround(coord) {
        console.log(coord);

        let { nrows, ncols } = this.props;
        let board = this.state.board;
        let [x, y] = coord.split("-").map(Number);

        function flipCell(x, y) {
            if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
                console.log(x, y);
                board[x][y] = !board[x][y];
            }
        }

        flipCell(x, y);
        flipCell(x - 1, y); // above cell
        flipCell(x + 1, y); // below cell
        flipCell(x, y - 1); // left cell
        flipCell(x, y + 1); // right cell

        let hasWon = board.every(row => row.every(column => !column));
        /*
        let hasWon = true;
        for (let x = 0; x < this.props.nrows; x++) {
            for (let y = 0; y < this.props.ncols; y++) {
                if(board[x][y]) hasWon = false;
            }
        }
        */

        this.setState({ board: board, hasWon: hasWon})
    }

    render() {
        if (this.state.hasWon) {
            return(
                <div className='Board-title'>
                    <div className='winner'>
                        <span className='neon-orange'>You</span>
                        <span className='neon-blue'>Win</span>
                    </div>
                </div>
            );
        }
        let table = [];
        for (let x = 0; x < this.props.nrows; x++) {
            let row = [];
            for (let y = 0; y < this.props.ncols; y++) {
                let coord = `${x}-${y}`;
                row.push(<Cell
                            key={coord} isLit={this.state.board[x][y]}
                            flipCellsAroundMe={() => this.flipCellsAround(coord)}
                        />
                );
            }
            table.push(<tr key={x}>{row}</tr>);
        }
        return(
            <div>
                <div className='Board-title'>
                    <div className='neon-orange'>Lights</div>
                    <div className='neon-blue'>Out</div>
                </div>
                <table className='Board'>
                    <tbody>{table}</tbody>
                </table>
            </div>
        )
    }
}

export default Board;