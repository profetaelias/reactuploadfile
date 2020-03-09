import React from 'react';
import { Container, FileInfo, Preview } from './styles';
import {CircularProgressbar} from 'react-circular-progressbar';
import {MdCheckCircle, MdError, MdLink} from 'react-icons/md';

const FileList = ({files, onDelete}) => 
    <Container>
        { 
            files.map(uploadedFile => (
                <li key={uploadedFile.id}>
                    <FileInfo>
                        <Preview src={uploadedFile.preview} />
                        <div>
                            <strong>{uploadedFile.name}</strong>
                            {uploadedFile.uploaded && (
                                <span>{uploadedFile.readableSize}<button onClick={() => onDelete(uploadedFile.id)}>Excluir</button></span>
                            )}
                        </div>
                    </FileInfo>
                    <div>
                        {!uploadedFile.error && !uploadedFile.uploaded && (
                            <CircularProgressbar progress={uploadedFile.progress}
                                styles={{
                                    text: {
                                        fill: uploadedFile.progress >= 30 ? 'green' : 'red'
                                    },
                                    root: { width: 44 },
                                    
                                    path: {
                                        stroke: '#7159c1',
                                        strokeLinecap: 'round',
                                        transition: 'stroke-dashoffset 0.5s ease 0s',
                                    },
                                    trail: {
                                        stroke: '#C0C0C0',
                                        strokeLinecap: 'round',
                                    }
                                }}
                                initialAnimation={true}
                                strokeWidth={10}
                                value={uploadedFile.progress}
                                text={`${uploadedFile.progress}%`}
                            />
                        )}

                        {uploadedFile.url && (
                            <a href={uploadedFile.url}
                               target="_blank"
                               rel="noopener noreferrer">
                        
                               <MdLink style={{ marginRight: 8 }} size={24} color="#222"/>
                            </a>
                        )}

                        {!!uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}  
                        {uploadedFile.error && <MdError size={24} color="#e57878" />}
                    </div>
                </li>
            ))
        }
    </Container>

export default FileList;