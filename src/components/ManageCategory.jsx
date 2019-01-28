import React, { Component } from 'react';
import axios from 'axios'

class ManageCategory extends Component {
    state = { listCategory: [] }
    componentDidMount() {
        this.getCategoryList();
    }

    getMovieList = () => {
        axios.get('http://localhost:1996/categorylist')
            .then((res) => {
                this.setState({ listCategory: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnAddClick = () => {
        var nama = this.refs.addNama.value;

        axios.post('http://localhost:1996/addcategory', {
                nama
            }).then((res) => {
                this.getCategoryList();
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are u sure to delete?')) {
            axios.delete('http://localhost:1996/deletecategory/' + id)
                .then((res) => {
                    this.getCategoryList();
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    renderBodyCategories = () => {
        var listCategory = this.state.listCategory.map(({ id, nama }) => {
            return (
                <tr>
                    <td>{id}</td>
                    <td>{nama}</td>
                    <td><input className="btn btn-primary" type="button" value="Edit" /></td>
                    <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                </tr>
            )
        })
        return listCategory;
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBodyCategories()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>
                                    <input ref="addNama" type="text" placeholder="Nama film" />
                                </td>
                                <td>
                                    <input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </center>
            </div>
        )
    }
}

export default ManageCategory;