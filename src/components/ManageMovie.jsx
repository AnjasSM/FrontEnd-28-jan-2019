import React, { Component } from 'react';
import axios from 'axios';

class ManageMovie extends Component {
    state = { listMovie: [] }
    componentDidMount() {
        this.getMovieList();
    }

    getMovieList = () => {
        axios.get('http://localhost:1996/movielist')
            .then((res) => {
                this.setState({ listMovie: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnAddClick = () => {
        var nama = this.refs.addNama.value;
        var tahun = this.refs.addTahun.value;
        var description = this.refs.addDesc.value;

        axios.post('http://localhost:1996/addmovie', {
                nama, tahun, description
            }).then((res) => {
                this.getMovieList();
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are u sure to delete?')) {
            axios.delete('http://localhost:1996/deletemovie' + id)
                .then((res) => {
                    this.getMovieList();
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    renderBodyMovies = () => {
        var listMovie = this.state.listMovie.map(({ id, nama, tahun, description }) => {
            return (
                <tr>
                    <td>{id}</td>
                    <td>{nama}</td>
                    <td>{tahun}</td>
                    <td>{description}</td>
                    <td><input className="btn btn-primary" type="button" value="Edit" /></td>
                    <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                </tr>
            )
        })
        return listMovie;
    }

    render () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase">Movie List</h2>
                    </div>
                </div>
                <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nama</th>
                                <th>Tahun</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBodyMovies()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>
                                    <input ref="addNama" type="text" placeholder="Nama film" />
                                </td>
                                <td>
                                    <input ref="addTahun" type="text" placeholder="Tahun Rilis" />                                    
                                </td>
                                <td>
                                    <textarea ref="addDesc" placeholder="Enter the Description here"></textarea>
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

export default ManageMovie;