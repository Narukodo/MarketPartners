import { action } from 'mobx'
import axios from 'axios'
import { mpStore } from 'stores'
// import { pick } from 'lodash'
import { URL2BASE64 } from 'constants'

class ImageStore {
  @action('Post Image to Server')
  postImageToServer = async (referralId, image) => {
    const formData = new FormData()
    formData.append('logo', image)

    try {
      const { data } = await axios.post(
        `http://upload.homigo.com/logo/${referralId}`,
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      )
      mpStore.setValue('image_url', data.urls[0])
      return data
    } catch (e) {
      return console.log(e)
    }
  }
}

export default new ImageStore()
