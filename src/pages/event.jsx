import React, {Component} from "react";
import $ from "jquery";
import Card from "../components/cardEvent"
class Event extends Component {
    constructor(){
       super()
       this.state = {
            event: [
                {
                    nama : "Car Free Day",
                    tanggal : "5 Juni 2022",
                    lokasi : "Jalan Idjen",
                    gambar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdUJB7Y9CxtpITQOyJDULIBokFbFTLOXpOOw&usqp=CAU"
                },
                {
                    nama : "Tanam Mangrove",
                    tanggal : "5 Juni 2022",
                    lokasi : "Pantai Balekambang",
                    gambar : "https://asset.kompas.com/crops/nlsC9WFdZCXyzNs4CiPrfyxL9MM=/0x120:1024x803/750x500/data/photo/2021/09/29/6153fc3317cc0.jpeg"
                },
                {
                    nama : "Tebar Benih Ikan",
                    tanggal : "5 Juni 2022",
                    lokasi : "Sungai Brantas",
                    gambar : "https://koropak.co.id/storage/img/cover/gubernur-jawa-barat-tebar-benih-ikan.jpg"
                },
           ],

            action: "",
            nama: "",
            tanggal: "",
            lokasi: "",
            gambar: "",
            selectedItem: null,
       } 
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    {this.state.event.map( (item, index) => (
                        <Card
                        nama={item.nama}
                        tanggal={item.tanggal}
                        lokasi={item.lokasi}
                        gambar={item.gambar}
                        onEdit={ () => this.Edit(item)}
                        onDrop={ () => this.Drop(item)}
                        />
                    ))}
                </div>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_event">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-body">
                                Form Event
                            </div>
                            {/* modal body */}
                            <div className="modal-body">
                            <form onSubmit={ev => this.Save(ev)}>
                                Nama Event :
                                <input type="text" className="form-control mb-2"
                                    value={this.state.nama}
                                    onChange={ ev => this.setState({nama:
                                    ev.target.value}) }
                                    required />
                                
                                Tanggal :
                                <input type="text" className="form-control mb-2"
                                    value={this.state.tanggal}
                                    onChange={ ev => this.setState({tanggal
                                    : ev.target.value}) }
                                    required />

                                Lokasi :
                                <input type="text" className="form-control b-2"
                                    value={this.state.lokasi}
                                    onChange={ ev => this.setState({lokasi: ev.target.value}) }
                                    required />
                                    
                                Gambar Event :
                                <input type="url" className="form-control mb-2"
                                    value={this.state.gambar}
                                    onChange={ ev => this.setState({gambar:
                                    ev.target.value}) }
                                    required />

                                <button className="btn btn-info btn-block" type="submit">
                                    Simpan
                                </button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    Add = () => {
        // menampilkan komponen modal
        $("#modal_event").show();
        this.setState({
            nama: "",
            tanggal: "",
            lokasi: "",
            gambar: "",
            action: "insert"
        })
    }
    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal_event").show();
        this.setState({
        nama: item.nama,
        tanggal: item.tanggal,
        lokasi: item.lokasi,
        gambar: item.gambar,
        action: "update",
        selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        // menampung data state event
        let tempEvent = this.state.event
        if (this.state.action === "insert") {
        // menambah data baru
        tempEvent.push({
        nama: this.state.nama,
        tanggal: this.state.tanggal,
        lokasi: this.state.lokasi,
        gambar: this.state.gambar,
        })
    }else if(this.state.action === "update"){
        // menyimpan perubahan data
        let index = tempEvent.indexOf(this.state.selectedItem)
        tempEvent[index].nama = this.state.nama
        tempEvent[index].tanggal = this.state.tanggal
        tempEvent[index].lokasi = this.state.lokasi
        tempEvent[index].gambar = this.state.gambar
    }
    this.setState({event : tempEvent})
    // menutup komponen modal_event
    $("#modal_event").hide();
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
        // menghapus data
        let tempEvent = this.state.event
        // posisi index data yg akan dihapus
        let index = tempEvent.indexOf(item)
        // hapus data
        tempEvent.splice(index, 1)
        this.setState({event: tempEvent})
        }
    }

}
export default Event;