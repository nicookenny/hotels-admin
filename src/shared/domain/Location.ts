/** @format */

interface LocationProps {
  city: string
  country: string
  zip_code: string
}

export class Location {
  private props: LocationProps

  constructor(props: LocationProps) {
    this.props = props
  }

  get city(): string {
    return this.props.city
  }

  get country(): string {
    return this.props.country
  }

  get zip_code(): string {
    return this.props.zip_code
  }

  public static create(props: LocationProps): Location {
    return new Location(props)
  }
}
