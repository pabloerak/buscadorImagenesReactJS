import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'

function App() {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            //es asincrona ya que voy a hacer una llamado a la API
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID rTprblb9x4sBg3no7PZ1BuudK6-kwDs7A1d3dnXzJM4'
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search" />
          </Form>

        </Formik>
      </header>
      <div className="container">
          <div className="center">
            {photos.map(photo => 
              <article key ={photo.id} onClick={() => open(photo.links.html)}>
                <img src={photo.urls.regular} />
                <p>{[photo.description, photo.alt_description].join(' -')}</p>
              </article>
            )}
          </div>
      </div>
    </div>
  );
}

export default App;
