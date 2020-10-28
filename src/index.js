const app = require('express')();
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
// for login
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const faunadb = require('faunadb'),
            q = faunadb.query;

const client = new faunadb.Client({ secret: 'fnAD5MWGThACDLCRURRQOsUvKPQ-5uHiytzKodAR'});

// const app = express();
// app.use(bodyParser.json());

app.get('/api/users/', async (req, res) => {
    client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('users')), { size: 999999 }),
            q.Lambda(x => q.Get(x))
          )
        )
        .then((ret) => res.send(ret)).catch(err => console.log(err));
});

app.post('/api/signup/', jsonParser, async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const doc = await client.query(
            q.Create(
                q.Collection("users"),
                {
                  credentials: { password: data.password },
                  data: {
                    username: data.username,
                  },
                }
              )
        )
        .then((ret) => res.send(doc));
        }
    catch (err) {
        res.send(err);
    }
});

app.post('/api/signin/', jsonParser, async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const doc = await client.query(
            q.Login(
                q.Match(q.Index("users_by_username"), data.username),
                { password: data.password },
              )
        )
        .then((ret) => res.send(ret));
        }
    catch (err) {
        res.send(err);
    }
});

app.post('/api/signout/', (req,res) => {
  try {
    client.query(q.Logout(true)).then((ret) => res.send(ret));
  } catch (err) {
    res.send(err);
  }
});


app.listen(5000, () => console.log('Server running on port 5000'));