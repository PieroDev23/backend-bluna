import { AppBluna } from "./app"

(async () => {
    const app = new AppBluna();
    await app.listen(process.env.PORT || '5000');
})();

