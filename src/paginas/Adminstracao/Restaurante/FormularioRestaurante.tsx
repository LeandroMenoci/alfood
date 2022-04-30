import { Button, TextField, Typography, Container, Paper } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"



const FormularioRestaurante = () => {
  const url = 'http://localhost:8000/api/v2/restaurantes/'

  const parametros = useParams()
  useEffect(() => {
    if (parametros.id) {
      axios.get<IRestaurante>(`${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros])

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      axios.put(`${url}${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante atualizado com sucesso')
        })
    } else {
      axios.post(url, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante cadastrado com sucesso')
        })
    }
  }
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component='h1' variant='h6'>Formulário de Restaurantes</Typography>
            <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
              <TextField
                value={nomeRestaurante}
                onChange={event => setNomeRestaurante(event.target.value)}
                id="standard-basic"
                label="Nome do Restaurante"
                variant="standard"
                fullWidth
                required />
              <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth >Salvar</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default FormularioRestaurante