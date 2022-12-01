
const Homepage = () => {
    return (
        <div className="mt-5">
            <img
                src="/logo192.png"
                alt="quizzly logo"
                className="mb-3"
            />
            <h1>QUIZZLY</h1>
            <p className="lead">for quiz-makers and quiz-takers</p>

            <button className="btn btn-secondary btn-sm mt-3" data-bs-toggle="modal" data-bs-target="#aboutModal"> about </button>

            <div className="modal fade" id="aboutModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">About Quizzly</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p><i>Quizzly</i> was created by <a href="https://www.linkedin.com/in/jasonermer/" target="_blank">Jason Ermer</a>. The documentation and source code are available on <a href="https://github.com/jermer/quizzly" target="_blank">GitHub</a>.</p>

                            <p>The project was inspired by and emulates <a href="https://kahoot.com/" target="_blank">Kahoot!</a> It was completed as part of the <a href="https://www.springboard.com/" target="_blank">Springboard</a> Software Engineering Career Track.</p>

                            <p>The logo is <a href="https://game-icons.net/1x1/lord-berandas/artificial-intelligence.html" target="_blank">artificial intelligence</a> by Lord Berandas, available from <a href="https://game-icons.net/" target="_blank">game-icons.net</a> and used under a <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC-BY 3.0</a> license.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;