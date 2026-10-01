export default function BookCard({ book }) {

    return (

        <div className="card">

            <h3>{book.original_name}</h3>

            <p>Subject : {book.subject}</p>

            <p>Pages : {book.pages}</p>

            <p>Status : {book.status}</p>

        </div>

    );

}