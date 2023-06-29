import { Row, Col, Divider } from '@ant-design-solid/component'
import { JSX, Component } from 'solid-js'

const style: JSX.CSSProperties = { background: '#0092ff', padding: '8px 0' }

const DemoBox: Component<{ children: JSX.Element; value: number }> = (
  props
) => (
  <p
    style={{
      height: `${props.value}px`,
      'background-color': 'rgba(128, 128, 128, 0.08)'
    }}
  >
    {props.children}
  </p>
)

export default () => {
  return (
    <div>
      <h1>基础</h1>
      <Row>
        <Col span={24}>col</Col>
      </Row>
      <Row>
        <Col span={12}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
      <Row>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
      </Row>
      <h1>区块间隔</h1>
      <Divider orientation="left">Horizontal</Divider>
      <Row gutter={16}>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
      <Divider orientation="left">Responsive</Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
      <Divider orientation="left">Vertical</Divider>
      <Row gutter={[16, 24]}>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col class="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
      <h1>左右偏移</h1>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8} offset={8}>
          col-8
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={6}>
          col-6 col-offset-6
        </Col>
        <Col span={6} offset={6}>
          col-6 col-offset-6
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          col-12 col-offset-6
        </Col>
      </Row>
      <h1>栅格排序</h1>
      <Row>
        <Col span={18} push={6}>
          col-18 col-push-6
        </Col>
        <Col span={6} pull={18}>
          col-6 col-pull-18
        </Col>
      </Row>
      <h1>排版</h1>
      <Divider orientation="left">sub-element align left</Divider>
      <Row justify="start">
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
      </Row>

      <Divider orientation="left">sub-element align center</Divider>
      <Row justify="center">
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
      </Row>

      <Divider orientation="left">sub-element align right</Divider>
      <Row justify="end">
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
      </Row>

      <Divider orientation="left">sub-element monospaced arrangement</Divider>
      <Row justify="space-between">
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
      </Row>

      <Divider orientation="left">sub-element align full</Divider>
      <Row justify="space-around">
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
      </Row>

      <Divider orientation="left">sub-element align evenly</Divider>
      <Row justify="space-evenly">
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
      </Row>
      <h1>对齐</h1>
      <Divider orientation="left">Align Top</Divider>
      <Row justify="center" align="top">
        <Col span={4}>
          <DemoBox value={100}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={50}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={120}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={80}>col-4</DemoBox>
        </Col>
      </Row>

      <Divider orientation="left">Align Middle</Divider>
      <Row justify="space-around" align="middle">
        <Col span={4}>
          <DemoBox value={100}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={50}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={120}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={80}>col-4</DemoBox>
        </Col>
      </Row>

      <Divider orientation="left">Align Bottom</Divider>
      <Row justify="space-between" align="bottom">
        <Col span={4}>
          <DemoBox value={100}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={50}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={120}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={80}>col-4</DemoBox>
        </Col>
      </Row>
      <h1>order</h1>
      <Divider orientation="left">Normal</Divider>
      <Row>
        <Col span={6} order={4}>
          1 col-order-4
        </Col>
        <Col span={6} order={3}>
          2 col-order-3
        </Col>
        <Col span={6} order={2}>
          3 col-order-2
        </Col>
        <Col span={6} order={1}>
          4 col-order-1
        </Col>
      </Row>
      <Divider orientation="left">Responsive</Divider>
      <Row>
        <Col
          span={6}
          xs={{ order: 1 }}
          sm={{ order: 2 }}
          md={{ order: 3 }}
          lg={{ order: 4 }}
        >
          1 col-order-responsive
        </Col>
        <Col
          span={6}
          xs={{ order: 2 }}
          sm={{ order: 1 }}
          md={{ order: 4 }}
          lg={{ order: 3 }}
        >
          2 col-order-responsive
        </Col>
        <Col
          span={6}
          xs={{ order: 3 }}
          sm={{ order: 4 }}
          md={{ order: 2 }}
          lg={{ order: 1 }}
        >
          3 col-order-responsive
        </Col>
        <Col
          span={6}
          xs={{ order: 4 }}
          sm={{ order: 3 }}
          md={{ order: 1 }}
          lg={{ order: 2 }}
        >
          4 col-order-responsive
        </Col>
      </Row>
    </div>
  )
}
