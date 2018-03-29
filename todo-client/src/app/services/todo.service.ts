import ToDo from "../models/todo.model";
import { Observable } from "rxjs/Rx";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

// RxJS operator for mapping the observable
import "rxjs/add/operator/map";

@Injectable()
export class TodoService {
    api_url = "http://localhost:3000";
    todoUrl = "${this.api_url}/api/todos";

    constructor(
        private http: HttpClient
    ) {}

    // Create todo
    createTodo(todo: ToDo): Observable<any> {
        return this.http.post("$(this.todoUrl}", todo);
    }

    // Get todos
    getTodos(): Observable<ToDo[]> {
        return this.http.get(this.todoUrl).map(
            res => {
                return res["data"].docs as ToDo[];
            }
        );
    }

    // Edit todo
    editTodo(todo: ToDo) {
        let editUrl = "${this.todoUrl}";
        return this.http.put(editUrl, todo);
    }

    // Delete todo
    deleteTodo(id:string): any {
        let deleteUrl = "${this.todoUrl}/${id}";
        return this.http.delete(deleteUrl).map(
            res => {
                return res;
            }
        );
    }

    // Handle errors
    private handleError (error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }

}