import { useState } from "react";
import { Document, Page } from "react-pdf";

export default function PDFViewer() {

    const [pages, setPages] = useState(0);

    const [pageNumber, setPageNumber] = useState(1);

    function loadSuccess({ numPages }) {

        setPages(numPages);

    }

    return (

        <div>

            <Document

                file="http://127.0.0.1:8000/uploads/R20CSE2202-OPERATING-SYSTEMS.pdf"

                onLoadSuccess={loadSuccess}

            >

                <Page pageNumber={pageNumber}/>

            </Document>

            <br/>

            <button

                disabled={pageNumber==1}

                onClick={()=>setPageNumber(pageNumber-1)}

            >

                Previous

            </button>

            <button

                disabled={pageNumber==pages}

                onClick={()=>setPageNumber(pageNumber+1)}

            >

                Next

            </button>

        </div>

    )

}