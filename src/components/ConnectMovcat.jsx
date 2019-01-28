import React, { Component } from 'react';
import axios from 'axios';

class ConnectMovcat extends Component {
    state = { listmovcat: [] }
    componentDidMount() {
        this.getMovcatList();
    }

    getMovcatList = () => {
        axios.get('http://localhost:1996/movcatlist')
            .then((res) => {
                this.setState({ listMovcat: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnAddClick = () => {
        var nama = this.refs.addNama.value;

        axios.post('http://localhost:1996/addmovcat', {
                nama
            }).then((res) => {
                this.getMovcatList();
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnDeleteClick = (idMovie,idCategory) => {
        if(window.confirm('Are u sure to delete?')) {
            axios.delete('http://localhost:1996/deletemovcat')
                .then((res) => {
                    this.getMovcatList();
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    renderBodyMovcat = () => {
        var listMovcat = this.state.listMovcat.map(({ idMovie, idCategory }) => {
            return (
                <tr>
                    <td>{idMovie}</td>
                    <td>{idCategory}</td>
                    <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(idMovie,idCategory)} /></td>
                </tr>
            )
        })
        return listMovcat;
    }

    render () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase">Category List</h2>
                    </div>
                </div>
                <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Nama Movie</th>
                                <th>Nama Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBodyMovcat()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <select ref="addMoviecat">
                                        <option>{this.FUCTION}</option>
                                    </select></td>
                                <td>
                                    <select ref="addCategoryMov">
                                        <option>{this.FUCTION}</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} />
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </center>
            </div>
        )
    }
}

export default ConnectMovcat;

