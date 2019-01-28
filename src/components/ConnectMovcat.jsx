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
        var idMovie = this.refs.addMoviecat.value;
        var idCategory = this.refs.addCategorymov.value;

        axios.post('http://localhost:1996/addmovcat', {
                idMovie, idCategory
            }).then((res) => {
                this.getMovcatList();
            }).catch((err) => {
                console.log(err)
            })
    }


    getNamaMovie = () => {
        var nama_Movie = this.state.listMovCat.map(({ namaMovie }) => {
            return (
                <option>{namaMovie}</option>
            )
        })
        return nama_Movie
    }
    getNamaCategory = () => {
        var nama_category = this.state.listMovCat.map(({ namaCat }) => {
            return (
                <option>{namaCat}</option>
            )
        })
        return nama_category
    }

    onBtnDeleteClick = () => {
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
                                        {this.getNamaMovie()}
                                    </select></td>
                                <td>
                                    <select ref="addCategoryMov">
                                        {this.getNamaCategory()}
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