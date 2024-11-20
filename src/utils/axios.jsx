import axios from "axios";


const instance = axios.create({
      baseURL: "https://api.themoviedb.org/3/",
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODJlMWMxMjk4MTNlZDI4ODAwNDdlMjFlMzk4YTRlNyIsIm5iZiI6MTczMTQwMzU2OC44Nzk0MjEyLCJzdWIiOiI2NzMzMWFmNWJlZmQ0OWMwYmI2NTdiMTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.l6ALfh3WZtk5dK_YSZhKTJrLGr5Go5e4LuWYaV1-edg'
      }
});


export default instance;