interface ContactFormEmailProps {
    name: string;
    email: string;
    message: string;
}

const ContactFormEmail : React.FC<Readonly<ContactFormEmailProps>> = ({
    name,
    email,
    message
}) => {
    return (
        <div>
            <h1>Contact Form Submission</h1>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Message: {message}</p>
        </div>
    );
};

export default ContactFormEmail;
