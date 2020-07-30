export const getFaucetGrant = () => {
  const faucetGrant = localStorage.getItem('faucet-grant-cid')
  if (!faucetGrant) return { cid: '', address: '' }
  return JSON.parse(faucetGrant)
}

export const setFaucetGrant = (msgCid, filecoinAddress) => {
  const item = { cid: msgCid, address: filecoinAddress }
  if (!getFaucetGrant().cid)
    localStorage.setItem('faucet-grant-cid', JSON.stringify(item))
}

export const removeFaucetGrantCid = () => {
  localStorage.removeItem('faucet-grant-cid')
}
