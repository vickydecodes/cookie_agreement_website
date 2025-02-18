const baseUrl = import.meta.env.VITE_BASE_URL;


const urls = {
    creationUrl: `${baseUrl}/create-user`,
    unsign_agreement_url : `${baseUrl}/unsign-agreement`,
    complete_project_url: `${baseUrl}/complete-project`,
    fetch_clients_url: `${baseUrl}/clients`,
    fetch_client_url: `${baseUrl}/client`,
    sign_agreement_url: `${baseUrl}/generate-pdf`

}

export default urls