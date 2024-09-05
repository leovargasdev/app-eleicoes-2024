import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import { useCandidates } from 'hooks'
import { maskToParamsURL } from 'utils/mask'
import type { CandidateSimple } from 'types/candidate'

import styles from './styles.module.scss'

const Candidate = (candidate: CandidateSimple) => {
  const { asPath } = useRouter()
  const baseUrl = asPath.split('/candidatos')[0]

  const code = candidate.numero.toString().split('')
  const name = maskToParamsURL(candidate.nomeUrna)

  const href = baseUrl + `/candidato/${candidate.id}-${name}`

  return (
    <Link
      href={href}
      prefetch={false}
      className={classNames('card', styles.candidate)}
    >
      <div className={styles.info}>
        <strong>{candidate.nomeUrna}</strong>
        <p>{candidate.nomeCompleto}</p>
      </div>

      <div className={styles.code}>
        {code.map(item => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </Link>
  )
}

export const Candidates = () => {
  const { candidates, filter } = useCandidates()

  const filterCandidates = (candidatesList: CandidateSimple[]) =>
    filter.length === 0
      ? candidatesList
      : candidatesList.filter(c => filter.includes(c.partidoSigla))

  if (!candidates.mayor.length || !candidates.councilor.length) {
    return null
  }

  const mayors = filterCandidates(candidates.mayor)
  const councilors = filterCandidates(candidates.councilor)

  return (
    <div className={styles.candidate__list}>
      <h2>Candidatos a prefeito</h2>
      <div className={styles.candidates}>
        {mayors.map(candidate => (
          <Candidate {...candidate} key={candidate.id} />
        ))}
      </div>
      <h2>Candidatos a vereador</h2>
      <div className={styles.candidates}>
        {councilors.map(candidate => (
          <Candidate {...candidate} key={candidate.id} />
        ))}
      </div>
    </div>
  )
}
