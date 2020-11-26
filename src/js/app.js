'use strict';

(function () {
    const gerarDivVagas = function (vaga) {
        const { link, cargo, localizacao } = vaga;
        let local = 'Remoto'
        if (localizacao) {
            const { bairro, cidade, pais } = localizacao;
            local = (bairro + " - " + cidade + ", " + pais)
        }

        return `
        <div class="flex-1 flex-basis-0 mb-10">
            <a href="${link}">${cargo}</a> 
            <span class="float-right">
            ${local}</span>
        </div> 
        `
    }

    function fetchVagas() {
        document.querySelector("#vagas-load").classList.remove('hide')
        return fetch('http://www.mocky.io/v2/5d6fb6b1310000f89166087b').then(res => {
            res.json().then(vagas => {
                document.querySelector("#vagas-success").classList.remove('hide')

                // Funcionamento correto
                const vagasAtivas = vagas['vagas'].filter((vaga) => vaga.ativa);
                
                // Simular nenhuma vaga ativa
                // const vagasAtivas = [];
                
                if (vagasAtivas.length > 0) {
                    document.querySelector("#vagas").innerHTML = vagasAtivas
                        .reduce((html, vaga) => html += gerarDivVagas(vaga), '');
                }
                else document.querySelector("#vagas").innerHTML = 
                    "<p> Nenhuma vaga aberta no momento, mas fique de olho sempre temos novidades :)</p>";                
            })
        }).catch(() =>
            document.querySelector("#vagas-fail").classList.remove("hide")
        ).finally(() => document.querySelector("#vagas-load").classList.add('hide'))
    }

    document.querySelector("#vagas-fail button").addEventListener('click', () => fetchVagas());

    window.onhashchange = function () {
        const hash = window.location.hash;
        if (hash == '#vagas') {
            document.querySelector("#vagas").scrollIntoView();
        }
    }

    window.onload = () => {
        fetchVagas();
    };
})();
