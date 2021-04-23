import { Page } from "./page.mjs";

class User extends Page{
    constructor(){
        super()
    }
    getData(){
        return{
            title : 'Usuarios',
            name : 'Marcelo diaz',
            email: 'diazdix@gmail.com',
            password : ''
        }
    }

    getHTML(){
        return `
            <div class="col-4">
                <div class="card-body">
                    <h2>${this.data.title}</h2>
                    </br>
                    <div class="form-group">
                        <label for="name">Nombre de Usuario</label>
                        <input id="prueba" type="text" class="form-control" c-persist="name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" c-persist="email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" c-persist="password">
                    </div>
                    <button type="button" class="btn btn-success">Guardar</button>
                    <br/>
                    <br/>
                    <span>${this.data.name}</span>
                </div>        
            </div>
        `
    }
}

new User();