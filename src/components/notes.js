<Form>
  <Form.Group widths='equal'>
    <Form.Field control={Input} label='First name' placeholder='First name' />
    <Form.Field control={Input} label='Last name' placeholder='Last name' />
    <Form.Field control={Select} label='Gender' options={1,2} placeholder='Gender' />
  </Form.Group>
  <Form.Group inline>
    <label>Quantity</label>
    <Form.Field
      control={Radio}
      label='One'
      value='1'
      checked={false}
      onChange={this.handleChange}
    />
    <Form.Field
      control={Radio}
      label='Two'
      value='2'
      checked={true}
      onChange={this.handleChange}
    />
    <Form.Field
      control={Radio}
      label='Three'
      value='3'
      checked={false}
      onChange={this.handleChange}
    />
  </Form.Group>
  <Form.Field control={TextArea} label='About' placeholder='Tell us more about you...' />
  <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' />
  <Form.Field control={Button}>Submit</Form.Field>
</Form>
