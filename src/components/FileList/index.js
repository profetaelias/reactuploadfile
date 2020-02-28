import React from 'react';
import { Container, FileInfo } from './styles';
import CircularProgressbar from 'react-circular-progressbar';
import {MdCheckCircle, MdError, MdLink} from 'react-icons/md';


const FileList = () => 
    <Container>
        <li>
            <FileInfo>
                <Preview src="https://www-sisgf/SisGF/temas/dataprev2014/logo_dataprev.png" />
                <div>
                    <strong>profile.png</strong>
                    <span>64kb<button onClick={()=>{}}>Excluir</button></span>
                </div>
            </FileInfo>
            <div>
                <CircularProgressbar styles={{
                        root: { width:24 },
                        path: { stroke: '#7159c1'}
                    }}
                    strokeWidth={10}
                    percentege={60}
                />
                    <a 
                        href="https://www-sisgf/SisGF/temas/dataprev2014/logo_dataprev.png"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    
                    <MdLink 

                />

            </div>
        </li>
    </Container>

export default FileList;