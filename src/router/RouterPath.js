const prefix = "/";
export default class RouterPath {
    static HOME = prefix + '';
    static LOGIN = '/login';
    static DETAIL = '/detail/:id';
    static LISTSUP = '/listsupplier';
    static UPDATE = '/update/:type/:id';

    static getRouteWithId(path, id) {
        return path.replace(":id", id)
    }
}