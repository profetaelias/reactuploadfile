import React, { Component } from 'react';
import GlobalStyle from './styles/global'
import { Container, Content } from './styles'
import Upload from './components/Upload/'
import FileList from './components/FileList'
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import api from './services/api';

class App extends Component {

  state = {
    uploadedFiles: []
  };

  async componentDidMount() {
    const response = await api.get('/posts');
    
    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url,
      }))
    })
  }

  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  handleDelete = async id => {
    api.delete(`/posts/${id}`)
    const response = await api.get('/posts');
  
    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }))
    })
    //this.setState({
      // uploadedFile: this.state.uploadedFiles.filter(uploadedFile => uploadedFile.id !== id),
    //})
    
  };

  handleUpload = (files) => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0, 
      uploaded: false,
      error: false,
      url: null,
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });

    uploadedFiles.forEach(this.processUpload);
  };

  uploadFile = (id, data) => {
    this.setState({uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
      return id === uploadedFile.id ? {...uploadedFile, ...data} : uploadedFile;
    })});
  }

  processUpload = (uploadedFile) => {
    const data = new FormData();
    data.append('file', uploadedFile.file, uploadedFile.name);
    
    api.post('/posts', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));
        this.uploadFile(uploadedFile.id, {
          progress: progress,
          uploaded: progress === 100 ? true : false
        })
      }
    }).then(response => {
      this.uploadFile(uploadedFile.id, {
        uploaded: true,
        id: response.data._id, 
        url: response.data.url,
      })
    })
    .catch(error => {
      this.uploadFile(uploadedFile.id, {
        error: true,
      })
    });
  };

  render() {
    const { uploadedFiles } = this.state;
    
    return <Container>
              <Content>
                <Upload onUpload={this.handleUpload}/>

                { !! uploadedFiles.length && (
                  <FileList files={uploadedFiles} onDelete={this.handleDelete}/>
                )}
                
              </Content>
              <GlobalStyle />
           </Container>
  }
}

export default App;