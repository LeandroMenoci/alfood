import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {
  const url = 'http://localhost:8000/api/v2/pratos/'
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    axios.get<IPrato[]>(url)
      .then(resposta => setPratos(resposta.data))
  }, [])

  const excluir = (pratoAhSerExcluido: IPrato) => {
    axios.delete(`${url}${pratoAhSerExcluido.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
        setPratos([...listaPratos])
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Tag
            </TableCell>
            <TableCell>
              Imagem
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map(prato => <TableRow key={prato.id}>
            <TableCell>
              {prato.nome}
            </TableCell>
            <TableCell>
              {prato.tag}
            </TableCell>
            <TableCell>
              <a href={prato.imagem} target='_blank' rel="noreferrer">ver imagem</a>
            </TableCell>
            <TableCell>
              <Link to={`/admin/restaurantes/${prato.id}`}>
                <Button variant="outlined">Editar</Button>
              </Link>
            </TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color="error"
                onClick={() => excluir(prato)}
              >Excluir</Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoPratos